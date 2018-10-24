import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import DeleteItem from 'components/DeleteItem/presentational';
import Router from 'next/router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import withStateMutation from 'hocs/withStateMutation';
import { ALL_ITEMS_QUERY } from 'components/Items/presentational';

export const DELETE_ITEM_MUTATION = gql`
	mutation DELETE_ITEM_MUTATION($id: ID!) {
		deleteItem(
			id: $id
		) {
			id
		}
	}
`;

export default compose(
	graphql(DELETE_ITEM_MUTATION, {
        props: ({ mutate }) => ({
            deleteItem: (id) => mutate({
                variables: {
					id
				},
				// Manually update the cache on the client so that it updates the server
				update: (cache, payload) => {
					// Read the cache for items we want
					const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
					// Filter the deleted item out of the page
					data.items = data.items.filter(({ id }) => id != payload.data.deleteItem.id);
					// Put the items back in the cache
					cache.writeQuery({ query:ALL_ITEMS_QUERY, data });
				}
            })
        })
	}),
	withStateMutation({ name: 'deleteItem' }),
	withHandlers({
		onClick: ({ id, deleteItem }) => async () => {
			const result = await deleteItem(id);
		}
	})
)(DeleteItem);
