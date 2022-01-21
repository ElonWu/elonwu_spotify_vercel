import type { NextPage } from 'next';
import { useCallback, useMemo, useEffect, useState, useRef } from 'react';
import type { Dispatch, SetStateAction, MouseEventHandler } from 'react';

// omponent
import GlobalLayout from '@layouts/global';
import { IconButton } from '@douyinfe/semi-ui';

// util
import { useRouter } from 'next/router';

import { SpotifyGetServerSideProps } from '@services/spotify/spotifyGetServerSideProps';
import { PlayState, Track } from '@models/spotify';
import TrackPlay from '@components/TrackPlay';
import {
  IconDoubleChevronLeft,
  IconDoubleChevronRight,
  IconPause,
  IconPlay,
} from '@douyinfe/semi-icons';
import { req } from '@utils/request';
import Loading, { PlayerSkeleton } from '@components/base/loading';
import { debounce } from 'lodash';

interface Player {
  connect: () => Promise<any>;
  disconnect: () => Promise<any>;
  togglePlay: () => Promise<any>;
  resume: () => Promise<any>;
  pause: () => Promise<any>;
  previousTrack: () => Promise<any>;
  nextTrack: () => Promise<any>;
  getCurrentState: () => Promise<any>;
  seek: (milliseconds: number) => Promise<any>;
  addListener: (event: string, cb: any) => void;
  removeListener: (event: string, cb: any) => void;
  activateElement: () => void;
}

const TrackDetail: NextPage<{
  access_token?: string;
  SPOTIFY_PLAYER_NAME?: string;
}> = ({ access_token, SPOTIFY_PLAYER_NAME }) => {
  const router = useRouter();

  const uri = useMemo(() => router?.query?.uri, [router?.query]);

  const playerRef = useRef<Player | null>();

  const [SDKReady, setSDKReady] = useState<boolean>(false);
  const [track, setTrack] = useState<Track | null>();

  const [playState, setPlayState] = useState<PlayState>();
  const [position, setPosition] = useState<number>(0);

  const onReady = useCallback(({ device_id }: { device_id: string }) => {
    console.log('5. on ready', { device_id });

    debounce(async () => {
      await req.put('/api/spotify/play', { device_id, uri });
      console.log('6. trigger play');
    }, 2000)(); // 有可能是 device 注册延迟，会出现 Device Not Found 的情况， 暂未完全解决；
  }, []);

  const onStateChange = useCallback((state) => {
    console.log('8. on state change', { state });
    if (!state) return;

    const {
      position,
      duration,
      track_window: { current_track },
    } = state;

    setPlayState(state);

    // 直接转换为百分比位置
    setPosition((position / duration) * 100);

    setTrack(current_track);
  }, []);

  const onSdkReady = useCallback(async () => {
    try {
      // @ts-ignore
      const player: Player = new Spotify.Player({
        name: SPOTIFY_PLAYER_NAME,
        getOAuthToken: (cb: any) => cb(access_token),
        volume: 0.5,
      });

      console.log('3. init player');

      // Ready
      player.addListener('ready', onReady);
      // StateChange
      player.addListener('player_state_changed', onStateChange);

      player.addListener('initialization_error', (e: any) =>
        console.log('initialization_error', e),
      );

      player.addListener('authentication_error', (e: any) =>
        console.log('authentication_error', e),
      );

      player.addListener('account_error', (e: any) =>
        console.log('account_error', e),
      );

      player.addListener('playback_error', (e: any) =>
        console.log('playback_error', e),
      );

      player.addListener('not_ready', (e: any) => console.log('not_ready', e));

      player.addListener('autoplay_failed', (e: any) =>
        console.log('autoplay_failed', e),
      );

      await player.connect();

      console.log('4. player connect');

      playerRef.current = player;
      setSDKReady(true);
    } catch (err) {
      console.log('on sdk ready error', err);
    }
  }, []);

  useEffect(() => {
    // @ts-ignore
    window.onSpotifyWebPlaybackSDKReady = onSdkReady;
  }, [onSdkReady]);

  useEffect(() => {
    return () => {
      const player = playerRef.current;
      if (player) player.disconnect();
    };
  }, []);

  const title = useMemo(() => `播放 - ${track?.name || '-'}`, [track]);
  const playType = useMemo(() => {
    if (uri?.includes('playlist')) {
      return '播放列表';
    }
    if (uri?.includes('album')) {
      return '播放专辑';
    }
    return '播放歌曲';
  }, [uri]);

  return (
    <GlobalLayout
      title={title}
      scripts={[
        {
          src: 'https://sdk.scdn.co/spotify-player.js',
        },
      ]}
    >
      <div className="h-screen w-full overflow-y-auto">
        <div className="flex flex-col items-stretch h-full">
          <div className="p-4 flex items-center justify-center border-b">
            <h4 className="text-center text-2xl font-bold text-gray-600">
              {playType}
            </h4>
          </div>

          <Loading
            loading={!playState}
            skeleton={
              <PlayerSkeleton
                style={{
                  height: `calc(100vh - 66px)`,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              />
            }
          >
            <div className="flex-1 flex items-center justify-center m-2">
              {track && <TrackPlay track={track} />}
            </div>

            <div className=" flex px-4 items-center justify-between">
              <h4 className="text-md font-bold text-gray-600">{track?.name}</h4>

              <div className="flex items-center justify-end-end space-x-2">
                {(track?.artists || []).map((artist, i) => {
                  return (
                    <span
                      key={artist.uri}
                      className={`text-sm font-normal text-gray-400 pl-2 ${
                        i === 0 ? 'border-none' : 'border-l'
                      }`}
                      onClick={() => {
                        const artistId = artist.uri?.split(':')?.[2];
                        if (artistId) router.push(`/artist/${artistId}`);
                      }}
                    >
                      {track?.artists[0]?.name || '-'}
                    </span>
                  );
                })}
              </div>
            </div>

            {playerRef.current && (
              <PlayerController
                player={playerRef.current}
                playState={playState}
                position={position}
                setPosition={setPosition}
              />
            )}
          </Loading>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default TrackDetail;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = SpotifyGetServerSideProps;

const PlayerController = ({
  player,
  playState,
  position,
  setPosition,
}: {
  player: Player;
  position: number;
  playState?: PlayState;
  setPosition: Dispatch<SetStateAction<number>>;
}) => {
  const onResetPosition: MouseEventHandler<HTMLDivElement> = useCallback(
    async (e: any) => {
      if (!player) return;

      const { width, x } = e.target.getBoundingClientRect();

      // 控制范围
      const percent = Math.max(0, Math.min(100, (e.clientX - x) / width));
      await player.seek(percent * (playState?.duration || 0));
    },
    [player, playState],
  );

  const timerRef = useRef<NodeJS.Timer | null>();

  useEffect(() => {
    if (playState?.paused !== false) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = setInterval(() => {
      // 直接转换为百分比位置
      setPosition((prev) => prev + (1000 / playState.duration) * 100); // 1000ms / duration 转换为百分比
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [playState]);

  return (
    <div className="controller p-4 flex flex-col items-stretch justify-start space-y-4">
      <div
        className="relative h-4 rounded-md"
        style={{
          backgroundImage: `linear-gradient(to right, green ${position}%, #999999 ${position}%)`,
        }}
        onClick={onResetPosition}
      />

      <div className="flex items-center justify-center space-x-4">
        <IconButton
          icon={<IconDoubleChevronLeft size="extra-large" />}
          onClick={() => player?.previousTrack()}
        />

        {playState?.paused ? (
          <IconButton
            icon={
              <IconPlay
                size="extra-large"
                onClick={() => player?.togglePlay()}
              />
            }
          />
        ) : (
          <IconButton
            icon={
              <IconPause size="extra-large" onClick={() => player?.pause()} />
            }
          />
        )}

        <IconButton
          icon={<IconDoubleChevronRight size="extra-large" />}
          onClick={() => player?.nextTrack()}
        />
      </div>
    </div>
  );
};
