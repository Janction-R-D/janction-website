import React from 'react';
import { Card } from 'antd';
import styles from '../index.less';
export default function AuthName({ data }) {
  return (
    <Card className={styles['card']}>
      <section className={styles['card-header']}>
        <h3>Real name authentication</h3>
      </section>
      <main className={styles['card-content']}>
        <ul>
          <ol>
            <li>
              <p>Account type:</p>{' '}
              <span>{data?.real_name_auth?.account_type}</span>
            </li>
            <li>
              <p>Legal person document type:</p>
              <span>{data?.real_name_auth?.corporate_name}</span>
            </li>
            <li>
              <p>The name of firm :</p>
              <span>{data?.real_name_auth?.the_name_of_firm}</span>
            </li>
          </ol>
          <ol>
            <li>
              <p>Authentication status:</p>
              <span className={styles['text-blue-certified']}>
                <p>{data?.real_name_auth?.authentication_status}</p>
                <i className="iconfont icon-certified"></i>
              </span>
            </li>
            <li>
              <p>Legal person document type:</p>
              <span>{data?.real_name_auth?.legal_person_document_type}</span>
            </li>
            <li>
              <p>Enterprise type: </p>
              <span>{data?.real_name_auth?.enterprise_type}</span>
            </li>
          </ol>
          <ol>
            <li>
              <p>Authentication time: </p>{' '}
              <span>
                {data?.real_name_auth?.authentication_time.split('T')[0]}
              </span>
            </li>
            <li>
              <p>Authentication email:</p>
              <span>{data?.real_name_auth?.authentication_email}</span>
            </li>
            <li>
              <p>Organization code: </p>
              <span>{data?.real_name_auth?.organization_code}</span>
            </li>
          </ol>
        </ul>
      </main>
    </Card>
  );
}
