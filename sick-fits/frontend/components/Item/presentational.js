import React from 'react';
import Link from 'next/link';
import Title from 'components/styles/Title';
import ItemStyles from 'components/styles/ItemStyles';
import PriceTag from 'components/styles/PriceTag';
import formatMoney from 'utils/formatMoney';
import DeleteItem from 'components/DeleteItem/container';

const Item = ({
	item
}) => {
	const {
		id,
		title,
		price,
		description,
		image
	} = item;

	return (
		<ItemStyles>
			{image && <img src={image} alt={title} />}
			<Title>
				<Link href={{ pathname: '/item', query: { id } }}>
					<a>{title}</a>
				</Link>
			</Title>
			<PriceTag>{formatMoney(price)}</PriceTag>
			<p>{description}</p>
			<div className="buttonList">
				<Link href={{
					pathname: 'update',
					query: { id }
				}}>
					<a>Edit</a>
				</Link>
				<button>Add To Cart</button>
				<DeleteItem id={id}>Delete this item</DeleteItem>
			</div>
		</ItemStyles>
	);
}

export default Item;
