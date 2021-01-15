import React, { useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useDispatch, useMappedState } from 'redux-react-hook';

import { closeNotify } from 'Store/actions/notify.action';
import styles from './index.module.scss';

interface dropItemProps {
  title: string;
  body: string;
  type: string;
  index: number;
}

const DropItem = ({ title, body, type, index }: dropItemProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(closeNotify(index));
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  });
  return (
    <div
      className={`${styles.notifyItem} ${
        type === 'error' ? styles.error : styles.success
      }`}
    >
      <div className={styles.img}>
        {type === 'error' ? <FaTimes /> : <FaCheck />}
        {/* <img src={type === "error" ? close : check} alt="icon" /> */}
      </div>
      <div className={styles.body}>
        <div>
          <span>{title}</span>
          <p>{body}</p>
        </div>
      </div>

      <div
        className={styles.close}
        onClick={() => dispatch(closeNotify(index))}
      >
        <FaTimes />
      </div>
    </div>
  );
};

const DropDown = () => {
  const messages = useMappedState(state => state.notify.messages);
  return (
    <div className={styles.notify}>
      {messages.map((message, i) => (
        <DropItem
          key={i}
          index={i}
          title={message.title}
          body={message.body}
          type={message.type}
        />
      ))}
    </div>
  );
};

export default DropDown;
