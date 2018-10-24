import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import UpdateItem from 'components/UpdateItem/presentational';
import Router from 'next/router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import formatMoney from 'utils/formatMoney';
import withStateMutation from 'hocs/withStateMutation';
import lifecycle from 'recompose/lifecycle';

export const UPDATE_ITEM_MUTATION = gql`
	mutation UPDATE_ITEM_MUTATION(
		$id: ID!
		$title: String
		$description: String
		$price: Int
		$image: String
		$largeImage: String
	) {
		updateItem(
			id: $id
			title: $title
			description: $description
			price: $price
			image: $image
			largeImage: $largeImage
		) {
			id
			title
			description
			price
			image
			largeImage
		}
	}
`;


export const SINGLE_ITEM_QUERY = gql`
	query SINGLE_ITEM_QUERY($id: ID!){
		item(where: { id: $id }) {
			id
			title
			description
			price
			image
			largeImage
		}
	}
`;

// const getPublicId = (path) => {
// 	const arr = path.split('/');
// 	const lastItem = arr[arr.length - 1];
// 	const id = lastItem.split('.')[0];
// 	return id;
// }

export default compose(
	withState('title', 'setTitle'),
	withState('description', 'setDescription'),
	withState('image', 'setImage'),
	withState('largeImage', 'setLargeImage'),
	withState('price', 'setPrice'),
	graphql(SINGLE_ITEM_QUERY, {
        name: 'data',
		options: ({ id }) => ({
            variables: {
                id: id
            }
        })
	}),
	graphql(UPDATE_ITEM_MUTATION, {
        props: ({ mutate }) => ({
            updateItem: (id, title, description, price, image, largeImage) => mutate({
				variables: {
					id,
					title,
					description,
					price,
					image,
					largeImage
                }
            })
        })
	}),
	withStateMutation({ name: 'updateItem' }),

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
		onImageUpload: ({ data, setImage, setLargeImage }) => async (event) => {
			const files = event.target.files;
			if (files == null || files.length === 0) {
				return;
			}

			const payload = new FormData();
			payload.append('file', files[0]);
			payload.append('upload_preset', 'sickfits');

			const res = await fetch('https://api.cloudinary.com/v1_1/garethlowrie/image/upload', {
				method: 'POST',
				body: payload
			});

			const file = await res.json(); // Convert response into json

			setImage(file.secure_url);
			if (file.eager) {
				setLargeImage(file.eager[0].secure_url);
			}
		},

		onFormSubmit: ({ id, updateItem, title, description, price, image, largeImage }) => async (e) => {
			e.preventDefault();
			const result = await updateItem(id, title, description, price, image, largeImage);

			Router.push({
				pathname: '/item',
				query: {
					id: result.data.updateItem.id
				}
			});
		}
	})
)(UpdateItem);
