// import { useState } from 'react';
// import Dashboard from './components/Dashboard';
// import Nodes from './components/Nodes';
// import Instance from './components/Instance';
// import BillDetails from './components/BillDetails';
// import SocialsLinks from '@/components/SocialsLinks';
// import styles from './index.less';
// import CustomConnectButton from '../../components/CustomConnectButton';
// import Create from './components/Create';
// import Orders from './components/Orders';
// import { QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';

// const navList = [
//   { name: 'Dashboard', path: '/genesis/dashboard', key: 0, icon: 'home' },
//   { name: 'Deploy Node', path: '/genesis/nodes', key: 1, icon: 'deploy-node' },
//   { name: 'My Nodes', path: '/genesis/instance', key: 2, icon: 'my-nodes' },
//   {
//     name: 'Configuration Instance',
//     path: '/genesis/create',
//     key: 5,
//     icon: 'purchase',
//   },
//   { name: 'Orders', path: '/genesis/instance', key: 3, icon: 'my-nodes' },
//   { name: 'Billings', path: '/genesis/billDetails', key: 4, icon: 'billings' },
// ];

// const Personal = (props) => {
//   const [curNav, setCurNav] = useState(navList[0]);
//   const [fold, setFold] = useState(false);
//   const [menuShow, setMenuShow] = useState(false);

//   const foldHandle = () => {
//     setFold(!fold);
//   };

//   const onNavChange = (nav) => {
//     setCurNav(nav);
//     setMenuShow(false);
//   };

//   return (
//     <div className={styles['personal-container']}>
//       <header className={styles['android-header']}>
//         <div className={styles['menu']}>
//           <i
//             className="iconfont icon-point-menu"
//             onClick={() => {
//               setMenuShow(!menuShow);
//             }}
//           ></i>
//           <nav
//             className={styles['menu-list']}
//             style={{ display: menuShow ? 'flex' : 'none' }}
//           >
//             {navList.map((item) => (
//               <div key={item.key} onClick={() => onNavChange(item)}>
//                 <i className={`iconfont icon-${item.icon}`} />
//                 <span>{item.name}</span>
//               </div>
//             ))}
//           </nav>
//         </div>
//         <img
//           className={styles['logo']}
//           src={require('@/assets/images/icons/logo_name.png')}
//         />
//         <CustomConnectButton afterClick={() => setMenuShow(false)} />
//       </header>
//       <aside className={fold && styles['fold']}>
//         <header>
//           <img
//             className={styles['logo-name']}
//             src={require('@/assets/images/icons/logo_name.png')}
//           />
//           <div className={styles['logo']}>
//             <img src={require('@/assets/images/icons/logo.png')} />
//           </div>
//         </header>
//         <nav>
//           {navList.map((item) => (
//             <div
//               key={item.key}
//               className={curNav.key == item.key && styles['active']}
//               onClick={() => onNavChange(item)}
//             >
//               <div className={styles['icon']}>
//                 <i className={`iconfont icon-${item.icon}`} />
//               </div>
//               <span>{item.name}</span>
//             </div>
//           ))}
//         </nav>
//         <div className={styles['footer']}>
//           <div className={styles['item']}>
//             <div className={styles['icon']}>
//               <QuestionCircleOutlined />
//             </div>
//             <span>Help</span>
//           </div>
//           <div className={styles['item']}>
//             <div className={styles['icon']}>
//               <SettingOutlined />
//             </div>
//             <span>Settings</span>
//           </div>
//         </div>
//         <div className={styles['fold-wrapper']} onClick={foldHandle}>
//           <i className={`iconfont ${fold ? 'icon-unfold' : 'icon-fold'}`}></i>
//         </div>
//       </aside>
//       <main>
//         <header>
//           <CustomConnectButton />
//         </header>
//         <div className={styles['content']}>
//           {curNav.key == 0 && <Dashboard />}
//           {curNav.key == 1 && <Nodes />}
//           {curNav.key == 2 && <Instance />}
//           {curNav.key == 3 && <Orders />}
//           {curNav.key == 4 && <BillDetails />}
//           {curNav.key == 5 && <Create />}
//           {window.location.pathname === '/genesis/create' && <Create />}
//         </div>
//       </main>
//       <footer className={styles['android-footer']}>
//         <img
//           className={styles['logo']}
//           src={require('@/assets/images/icons/logo_name.png')}
//         />
//         <div className={styles['bottom']}>
//           <SocialsLinks />
//           <p className={styles['comp-info']}>
//             JANCTION ©2024
//             <br />
//             janction.io
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// Personal.wrappers = ['@/wrappers/auth'];
// export default Personal;

import { Redirect } from 'umi';

const Genesis = (props) => {
  return <Redirect to="/genesis/dashboard"></Redirect>;
};

export default Genesis;
