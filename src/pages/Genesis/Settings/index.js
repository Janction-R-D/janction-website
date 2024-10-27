import React from 'react';
import { Button, Card, Input, Select } from 'antd';
import styles from './index.less';
export default function UserAccount() {
  const options = [
    {
      value: '1',
      label: '1 Month',
    },
    {
      value: '2',
      label: '2 Months',
    },
    {
      value: '3',
      label: '3 Month',
    },
    {
      value: '4',
      label: '4 Months',
    },
    {
      value: '5',
      label: '5 Months',
    },
    {
      value: '6',
      label: '6 Months',
    },
  ];
  return (
    <main>
      <h1 className={styles['title']}>Income management</h1>
      <section className={styles['banner']}>
        <div className={styles['banner-img']}>
          <img src="/account.png" className={styles['img']} />
        </div>
        <div className={styles['user-profile']}>
          <img src="/profile.png" className={styles['user-profile-img']} />
          <span className={styles['check-float']}>
            <i className="iconfont icon-certified"></i>
          </span>
        </div>
      </section>
      <article className={styles['user-info']}>
        <h2>Naila</h2>
        <div>
          <p>ID: 26378192</p>
          <p>Registration date: 2019-10-01</p>
          <p>ID: 26378192</p>
          <div className={styles['edit-info']}>
            <p>E-mail: 235365498@gmail.com </p>
            <span>Edit</span>
          </div>
        </div>
        <Button className={styles['create-btn']} type="primary">
          <span>
            <i className="iconfont icon-secured"></i>
          </span>{' '}
          Real name authentication
        </Button>
      </article>
      <Card className={styles['card']}>
        <section className={styles['card-header']}>
          <h3>Real name authentication</h3>
        </section>
        <main className={styles['card-content']}>
          <ul>
            <ol>
              <li>
                <p>Account type:</p> <span>Enterprise account</span>
              </li>
              <li>
                <p>Legal person document type:</p>
                <span> Naila Wu</span>
              </li>
              <li>
                <p>The name of firm :</p>
                <span>xxxxxx</span>
              </li>
            </ol>
            <ol>
              <li>
                <p>Authentication status:</p>
                <span className={styles['text-blue-certified']}>
                  <p>Certified</p>
                  <i className="iconfont icon-certified"></i>
                </span>
              </li>
              <li>
                <p>Legal person document type:</p>
                <span> ID card</span>
              </li>
              <li>
                <p>TEnterprise type: </p>
                <span>Business license</span>
              </li>
            </ol>
            <ol>
              <li>
                <p>Authentication time: </p> <span>2020-10-10</span>
              </li>
              <li>
                <p>Authentication email:</p>
                <span>Naila@gmail.com</span>
              </li>
              <li>
                <p>Organization code: </p>
                <span>192381093819</span>
              </li>
            </ol>
          </ul>
        </main>
      </Card>
      <Card className={styles['card']}>
        <section className={styles['card-header']}>
          <h3>Security settings</h3>
        </section>
        <section className={styles['card-security']}>
          <span>My private key</span>
          <div className={styles['card-security-items']}>
            <div className={styles['add-btn']}>
              <i className="iconfont icon-add"></i>
              <span>Please enter name</span>
            </div>
            <ul className={styles['card-security-keys']}>
              <div className={styles['card-security-key']}>
                <div>
                  <p>Private key 1</p>
                  <span>1256998854785</span>
                </div>
                <span className={styles['icon-red']}>
                  <i className="iconfont icon-delete "></i>
                </span>
              </div>
              <div className={styles['card-security-key']}>
                <div>
                  <p>Private key 2</p>
                  <span>1256998854785</span>
                </div>
                <span className={styles['icon-red']}>
                  <i className="iconfont icon-delete "></i>
                </span>
              </div>
              <div className={styles['card-security-key']}>
                <div>
                  <p>Private key 2</p>
                  <span>1256998854785</span>
                </div>
                <span className={styles['icon-red']}>
                  <i className="iconfont icon-delete "></i>
                </span>
              </div>
            </ul>
          </div>
        </section>
      </Card>
      <Card className={styles['card']}>
        <section className={styles['card-header']}>
          <h3>Pledge your assets</h3>
          <i className="iconfont icon-info"></i>
        </section>
        <section className={styles['card-assets-items']}>
          <div>
            <p>Quantity pledged (ETH)</p>
            <Input
              placeholder="Please enter the amount pledged"
              className={styles['card-assets-input']}
              suffix="ETH"
            />
          </div>
          <div>
            <p>Quantity pledged (ETH)</p>
            <Select
              showSearch
              bordered={false}
              className={styles['card-assets-select']}
              placeholder="Please enter the amount pledged"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              defaultValue={options[0].label}
              options={options}
            />
          </div>
          <div>
            <p>Anticipated income</p>
            <Input
              suffix="ETH"
              value={125}
              placeholder="Please enter the amount pledged"
              className={styles['card-assets-input']}
            />
          </div>
        </section>
      </Card>
    </main>
  );
}
