import React from 'react';
import styles from './test.module.css';

function Test() {
  return (
    <div className={styles.testRoot}>
      <div className={styles.testNoise} />
      <div className={styles.groupA}>
        <div className={styles.groupATop}>
          <button className={styles.iconButton} aria-label="Settings" />
          <button className={styles.iconButton} aria-label="Announcements" />
          <button className={styles.iconButton} aria-label="Calendar" />
        </div>
        <div className={styles.groupABottom}>
          <div className={styles.levelBadge}>
            <span className={styles.levelNumber}>115</span>
          </div>
          <div className={styles.userName}>Dokutah</div>
          <div className={styles.userId}>ID 319555825</div>
        </div>
      </div>

      <div className={styles.groupC}>
        <div className={styles.panelHeader}>OPERATIONS</div>
        <div className={styles.panelBody}>Squads</div>
      </div>

      <div className={styles.groupD}>
        <div className={styles.panelHeader}>TERMINAL</div>
        <div className={styles.panelBody}>Mission Control</div>
      </div>
    </div>
  );
}

export default Test;
