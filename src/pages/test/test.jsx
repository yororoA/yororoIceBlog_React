import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './test.module.less';

function Test() {
  const navigate = useNavigate();

  return (
    <div className={styles.testRoot}>
      <div className={styles.profilePanel}>
        <div className={styles.statusIcons}>
          <button className={styles.iconButton} aria-label="Settings" />
          <button className={styles.iconButton} aria-label="Announcements" />
          <button className={styles.iconButton} aria-label="Calendar" />
        </div>
        <div className={styles.profileMeta}>
          <div className={styles.levelRing}>
            <span className={styles.levelValue}>115</span>
          </div>
          <div className={styles.profileName}>Dokutah</div>
          <div className={styles.profileId}>ID 319555825</div>
        </div>
      </div>

      <div className={styles.spotlightPanel}>
        {/* <div className={styles.panelHeader}>OPERATIONS</div> */}
        <div className={styles.spotlightLayout}>
          <div className={styles.spotlightHero} />
          <div className={styles.spotlightGrid}>
            <div className={styles.spotlightCarousel}>
              <div className={styles.carouselStage}>Carousel</div>
              <div className={styles.carouselTicks}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <span
                    key={index}
                    className={
                      index === 2
                        ? `${styles.tick} ${styles.tickActive}`
                        : styles.tick
                    }
                  />
                ))}
              </div>
            </div>
            <div className={styles.spotlightSide}>
              <button
                className={`${styles.sideCard} ${styles.sideCardButton}`}
                type="button"
                onClick={() => navigate('/links')}
              >
                Links
              </button>
              <div className={styles.sideCard}>Archive</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.groupD}>
        <div className={styles.panelHeader}>TERMINAL</div>
        <div className={styles.panelBody}>Mission Control</div>
      </div>
    </div>
  );
}

export default Test;
