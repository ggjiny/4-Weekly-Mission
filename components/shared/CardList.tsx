import styles from './Card.module.css';
import CardItem from './CardItem';

interface Link {
  id: string;
  createdAt: string;
  description: string;
  imageSource: string;
  title: string;
  url: string;
}

interface CardListProps {
  links: Link[];
  search: string;
}

const CardList = ({ links, search }: CardListProps) => {
  if (links.length === 0)
    return <h1 className={styles.fail}>폴더 데이터를 가져오지 못했습니다.</h1>;

  return (
    <div className={styles.cardList}>
      <div className={styles.cardListContainer}>
        {links.map((item) => (
          <CardItem key={item.id} link={item} searchItem={search} />
        ))}
      </div>
    </div>
  );
};
export default CardList;
