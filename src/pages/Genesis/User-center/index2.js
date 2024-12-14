// import React, { useEffect, useState } from 'react';
// import { Button, Card, Input, Select } from 'antd';
// import styles from './index.less';
// import { fetchUserCenter } from '@/services/genesis/instance';
// import {
//   deleteKeysUserCenter,
//   fetchUserKeys,
//   postKeyUserData,
// } from '../../../services/genesis/instance';
// export default function UserAccount() {
//   const [data, setData] = useState({});
//   const [error, setError] = useState(false);
//   const [key, setKey] = useState(null);
//   const [keys, setKeys] = useState([
//     { name: 'test2', id: 'd950a962-9768-489e-80dc-751c1cb9bdcf' },
//   ]);
//   const getUserCenterData = () => {
//     fetchUserCenter()
//       .then((res) => {
//         setData(res);
//         console.log(res);
//       })
//       .catch((err) => setError(true))
//       .finally(() => {
//         setTimeout(() => {
//           setError(false);
//         }, 1500);
//       });
//   };
//   const getUserKeysData = () => {
//     fetchUserKeys()
//       .then((res) => {
//         console.log(res);
//         setKeys(res);
//       })
//       .catch((err) => setError(true));
//   };
//   useEffect(() => {
//     getUserCenterData();
//     getUserKeysData();
//   }, []);
//   const handleDelete = (key) => {
//     const data = {
//       id: key,
//     };
//     deleteKeysUserCenter(data)
//       .then((res) => {
//         const filtered = keys.filter((item) => item.id !== data.id);
//         setKeys(filtered);
//         console.log('Succeded :  Key Deleted successfully');
//         getUserKeysData();
//       })
//       .catch((err) => console.log(err));
//   };
//   const handleAdd = (name) => {
//     const data = { name };
//     postKeyUserData(data)
//       .then((res) => {
//         getUserKeysData();
//         setKey(undefined);
//         console.log('Succeded :  Key created successfully');
//       })
//       .catch((err) => console.log(err));
//   };
//   const options = [
//     {
//       value: '1',
//       label: '1 Month',
//     },
//     {
//       value: '2',
//       label: '2 Months',
//     },
//     {
//       value: '3',
//       label: '3 Month',
//     },
//     {
//       value: '4',
//       label: '4 Months',
//     },
//     {
//       value: '5',
//       label: '5 Months',
//     },
//     {
//       value: '6',
//       label: '6 Months',
//     },
//   ];
//   return (
//     <main>
//       <h1 className={styles['title']}>Income management</h1>
//       <section className={styles['banner']}>
//         <div className={styles['banner-img']}>
//           <img src="/account.png" className={styles['img']} />
//         </div>
//         <div className={styles['user-profile']}>
//           <img src="/profile.png" className={styles['user-profile-img']} />
//           <span className={styles['check-float']}>
//             <i className="iconfont icon-certified"></i>
//           </span>
//         </div>
//       </section>
//       <article className={styles['user-info']}>
//         <h2>Naila</h2>
//         <div>
//           <p>ID: {data.id}</p>
//           <p>Registration date: {data.registered_at?.split('T')[0]}</p>
//           <p>ID: 26378192</p>
//           <div className={styles['edit-info']}>
//             <p>E-mail: {data.email} </p>
//             <span>Edit</span>
//           </div>
//         </div>
//         <Button className={styles['create-btn']} type="primary">
//           <span>
//             <i className="iconfont icon-secured"></i>
//           </span>{' '}
//           Real name authentication
//         </Button>
//       </article>
//       <Card className={styles['card']}>
//         <section className={styles['card-header']}>
//           <h3>Real name authentication</h3>
//         </section>
//         <main className={styles['card-content']}>
//           <ul>
//             <ol>
//               <li>
//                 <p>Account type:</p>{' '}
//                 <span>{data.real_name_auth?.account_type}</span>
//               </li>
//               <li>
//                 <p>Legal person document type:</p>
//                 <span>{data.real_name_auth?.corporate_name}</span>
//               </li>
//               <li>
//                 <p>The name of firm :</p>
//                 <span>{data.real_name_auth?.the_name_of_firm}</span>
//               </li>
//             </ol>
//             <ol>
//               <li>
//                 <p>Authentication status:</p>
//                 <span className={styles['text-blue-certified']}>
//                   <p>{data.real_name_auth?.authentication_status}</p>
//                   <i className="iconfont icon-certified"></i>
//                 </span>
//               </li>
//               <li>
//                 <p>Legal person document type:</p>
//                 <span>{data.real_name_auth?.legal_person_document_type}</span>
//               </li>
//               <li>
//                 <p>Enterprise type: </p>
//                 <span>{data.real_name_auth?.enterprise_type}</span>
//               </li>
//             </ol>
//             <ol>
//               <li>
//                 <p>Authentication time: </p>{' '}
//                 <span>
//                   {data.real_name_auth?.authentication_time.split('T')[0]}
//                 </span>
//               </li>
//               <li>
//                 <p>Authentication email:</p>
//                 <span>{data.real_name_auth?.authentication_email}</span>
//               </li>
//               <li>
//                 <p>Organization code: </p>
//                 <span>{data.real_name_auth?.organization_code}</span>
//               </li>
//             </ol>
//           </ul>
//         </main>
//       </Card>
//       <Card className={styles['card']}>
//         <section className={styles['card-header']}>
//           <h3>Security settings</h3>
//         </section>
//         <section className={styles['card-security']}>
//           <span>My private key</span>
//           <div className={styles['card-security-items']}>
//             <div className={styles['add-btn']}>
//               <Input
//                 bordered={false}
//                 placeholder="Please enter name"
//                 prefix={
//                   <i
//                     className="iconfont icon-add add-key"
//                     style={{
//                       color: '#73d5f4',
//                       fontSize: '1.1rem',
//                       marginRight: '8px',
//                     }}
//                     onClick={() => handleAdd(key)}
//                   ></i>
//                 }
//                 onChange={(e) => setKey(e.target.value)}
//                 value={key}
//               />
//               {/* <i className="iconfont icon-add" onClick={() => handleAdd()}></i>
//               <span>Please enter name</span> */}
//             </div>
//             <ul className={styles['card-security-keys']}>
//               {keys?.map((item) => {
//                 return (
//                   <div className={styles['card-security-key']} key={item.id}>
//                     <div>
//                       <p>{item.name}</p>
//                       <span>{item.private_key}</span>
//                     </div>
//                     <span
//                       className={styles['icon-red']}
//                       onClick={() => handleDelete(item.private_key)}
//                     >
//                       <i className="iconfont icon-delete "></i>
//                     </span>
//                   </div>
//                 );
//               })}
//             </ul>
//           </div>
//         </section>
//       </Card>
//       <Card className={styles['card']}>
//         <section className={styles['card-header']}>
//           <h3>Staking your assets</h3>
//           <i className="iconfont icon-info"></i>
//         </section>
//         <section className={styles['card-assets-items']}>
//           <div>
//             <p>Quantity pledged (ETH)</p>
//             <section className={styles['card-assets-input']}>
//               <p> {data.assets?.amount}</p>
//               <span>ETH</span>
//             </section>
//           </div>
//           <div>
//             <p>Quantity pledged (ETH)</p>
//             <section className={styles['card-assets-input']}>
//               {data.assets?.duration_months}{' '}
//               {data.assets?.duration_months > 1 ? 'Months' : 'Month'}
//             </section>
//           </div>
//           <div>
//             <p>Anticipated income</p>
//             <section className={styles['card-assets-input']}>
//               <p>{data.assets?.anticipated_income}</p>
//               <span>ETH</span>
//             </section>
//           </div>
//         </section>
//       </Card>
//     </main>
//   );
// }
