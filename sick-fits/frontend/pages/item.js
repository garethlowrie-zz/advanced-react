import Link from 'next/link';
import Items from 'components/Items/presentational';
import SingleItem from 'components/SingleItem/container';

const Item = ({
    id
}) => {
    return (
        <SingleItem id={id} />
    )
}

export default Item;
