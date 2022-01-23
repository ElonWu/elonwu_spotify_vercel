import React, { Suspense, Component, ReactNode, lazy, ReactChild } from 'react';
import { isReactComponent } from '@utils/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

export * from 'react-router-dom';

export interface ElonRoute {
  key?: string;
  title?: string;
  path?: string;
  index?: boolean;
  component?: Component | string | (() => JSX.Element);
  redirect?: string;
  routes?: ElonRoute[];
  inMenu?: boolean;
  icon?: ReactNode;
}

// 生成嵌套路由
const genRoutesDom = (loading: ReactNode, routes?: ElonRoute[] | null) => {
  if (!Array.isArray(routes)) return null;

  return routes.map((route) => {
    const {
      path,
      index,
      component,
      redirect,
      key,
      routes: nestedRoutes,
    } = route;

    // 当前渲染内容
    const Page: any = !component ? (
      Outlet
    ) : isReactComponent(component) ? (
      (component as Component)
    ) : (
      // : typeof component === 'string' ? (
      //   lazy(() => import(component))
      // )
      <></>
    );

    // 渲染 element
    let element = null;

    if (redirect) {
      element = <Navigate to={redirect} replace />;
    } else {
      element = (
        <Suspense fallback={loading as ReactChild}>
          <Page />
        </Suspense>
      );
    }

    const routeProps = index
      ? { index: true, element } // IndexRouteProps
      : !path
      ? {
          element, // 纯布局
          children: genRoutesDom(loading, nestedRoutes), // 渲染子路由节点
        }
      : {
          path,
          element,
          children: genRoutesDom(loading, nestedRoutes), // 渲染子路由节点
        }; // PathRouteProps | LayoutRouteProps

    // 渲染路由节点
    return <Route key={key} {...routeProps} />;
  });
};

export const ElonRouter = ({
  rootRoutes,
  loading,
  basename = '/',
}: {
  basename: string;
  rootRoutes: ElonRoute[];
  loading: ReactNode;
}) => {
  return (
    <Router basename={basename}>
      <Routes>{genRoutesDom(loading, rootRoutes)}</Routes>
    </Router>
  );
};
