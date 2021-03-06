import React, {useState} from 'react'
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import ProfilePage from './pages/ProfilePage';

const { Content, Sider } = Layout;

function App() {
  const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))

  return (
    <Layout>
      <Sider 
        breakpoint="lg"
        collapsedWidth="0"
        width={180} 
        className="site-layout-background"
      >
        <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </Sider>
      <Layout style={{ padding: '0 24px' }}>
        <Content className="site-layout-background" style={{ margin: '24px 0', minHeight: '100vh'}}>
          <Switch>
            <Route path="/" exact>
              <HomePage currentUser={currentUser} />
            </Route>
            <Route path="/users/:username" component={() => <ProfilePage currentUser={currentUser} />} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
