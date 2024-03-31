import styles from './Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import facebookIcon from '../../public/icons/facebook.svg';
import instagramIcon from '../../public/icons/instagram.svg';
import youtubeIcon from '../../public/icons/youtube.svg';
import twitterIcon from '../../public/icons/twitter.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contents}>
        <span className={styles.copyright}>©codeit - 2023</span>
        <div className={styles.links}>
          <Link className={styles.leftLink} href="/privacy">
            Privacy Policy
          </Link>
          <Link className={styles.leftLink} href="/faq">
            FAQ
          </Link>
        </div>

        <div className={styles.sns}>
          <Link href="https://www.facebook.com/" target="_blank">
            <Image src={facebookIcon} alt="facebookIcon" width={20} height={20} />
          </Link>
          <Link href="https://www.twitter.com/" target="_blank">
            <Image src={twitterIcon} alt="twitterIcon" width={20} height={20} />
          </Link>
          <Link href="https://www.youtube.com/" target="_blank">
            <Image src={youtubeIcon} alt="youtubeIcon" width={20} height={20} />
          </Link>
          <Link href="https://www.instagram.com/" target="_blank">
            <Image src={instagramIcon} alt="instagramIcon" width={20} height={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
