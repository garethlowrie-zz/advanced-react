import Link from 'next/link';
import UpdateItem from 'components/UpdateItem/container';

const Item = ({
	query
}) => {
    return (
		<UpdateItem id={query.id}>
            Item Page
        </UpdateItem>
    )
}

export default Item;
