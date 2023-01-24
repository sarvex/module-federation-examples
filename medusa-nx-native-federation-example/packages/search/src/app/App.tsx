import React from 'react';
import { Layout, Divider } from 'antd';
import { loadRemoteModule } from '@softarc/native-federation';

import SearchList from './SearchList';
import { sendMessage } from './analytics';

import 'antd/dist/antd.css';

(async () => {
  const module = await loadRemoteModule({
    remoteName: 'nav',
    exposedModule: './Header',
    //remoteEntry: 'http://localhost:3003/remoteEntry.json'
  });

  console.log(module);

  return module;
})();

const Footer = React.lazy(async () => {
  const module = await loadRemoteModule({
    remoteName: 'nav',
    exposedModule: './Footer'
  });

  return module;
});

//const ProductCarousel = React.lazy(() => import('home/ProductCarousel'));

const App = () => {
  sendMessage('page loaded');
  return (
    <Layout style={{ maxWidth: 1200, margin: 'auto' }}>
      <React.Suspense fallback={<div />}>
        {/*<Header>Search Site</Header>*/}
      </React.Suspense>
      <Layout.Content style={{ padding: '2em', background: 'white' }}>
        <SearchList />
        <Divider>More Dogs</Divider>
        <React.Suspense fallback={<div />}>
          {/* TODO: Figure out why this is broken */}
          {/*<ProductCarousel />*/}
        </React.Suspense>
      </Layout.Content>
      <React.Suspense fallback={<div />}>
        <Footer>Search Site</Footer>
      </React.Suspense>
    </Layout>
  );
};

export default App;
