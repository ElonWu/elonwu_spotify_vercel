// 触发浏览器下载
export const download = (data: BlobPart, type: string, filename: string) => {
  try {
    const blob = new Blob([data], {
      encoding: 'UTF-8',
      type, // 指定数据转换文件类型
      // 比如 下载 exel
      // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    } as BlobPropertyBag);

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    link.click();
    window.URL.revokeObjectURL(link.href);
  } catch (err) {
    console.log({ err });
  }
};
