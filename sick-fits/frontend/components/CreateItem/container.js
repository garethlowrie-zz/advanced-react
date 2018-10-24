import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import CreateItem from 'components/CreateItem/presentational';
import Router from 'next/router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import formatMoney from 'utils/formatMoney';
import withStateMutation from 'hocs/withStateMutation';

export const CREATE_ITEM_MUTATION = gql`
	mutation CREATE_ITEM_MUTATION(
		$title: String!
		$description: String!
		$price: Int!
		$image: String
		$largeImage: String
	) {
		createItem(
			title: $title
			description: $description
			price: $price
			image: $image
			largeImage: $largeImage
		) {
			id
		}
	}
`;

export default compose(
	withState('title', 'setTitle', ''),
	withState('description', 'setDescription', ''),
	withState('image', 'setImage', ''),
	withState('largeImage', 'setLargeImage', ''),
	withState('price', 'setPrice', 0),
	graphql(CREATE_ITEM_MUTATION, {
        props: ({ mutate }) => ({
            createItem: (title, description, image, largeImage, price) => mutate({
                variables: {
					title,
					description,
					price,
					image,
					largeImage
                }
            })
        })
	}),
	withStateMutation({ name: 'createItem' }),
	withHandlers({
		onChange: ({ setTitle, setPrice, setDescription }) => (event) => {
			const { name, type, value } = event.target;
			const val = type === 'number' ? parseFloat(value) : value;

			switch (name) {
				case 'title':
					setTitle(event.target.value);
					break;
				case 'description':
					setDescription(event.target.value);
					break;
				case 'price':
					setPrice(val);
					break;
			}
		},
		onImageUpload: ({ setImage, setLargeImage }) => async (event) => {
			const files = event.target.files;
			const data = new FormData();
			data.append('file', files[0]);
			data.append('upload_preset', 'sickfits');

			const res = await fetch('https://api.cloudinary.com/v1_1/garethlowrie/image/upload', {
				method: 'POST',
				body: data
			});

			const file = await res.json(); // Convert response into json
			setImage(file.secure_url);
			setLargeImage(file.eager[0].secure_url);

		},

		onFormSubmit: ({ createItem, title, description, price, image, largeImage }) => async (e) => {
			e.preventDefault();
			const result = await createItem(title, description, image, largeImage, price);

			Router.push({
				pathname: '/item',
				query: {
					id: result.data.createItem.id
				}
			});
		}
	}),
)(CreateItem);
