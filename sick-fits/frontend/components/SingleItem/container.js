import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import CreateItem from 'components/CreateItem/presentational';
import Router from 'next/router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import formatMoney from 'utils/formatMoney';
import withStateMutation from 'hocs/withStateMutation';

const SINGLE_ITEM_QUERY = gql`
	query SINGLE_ITEM_QUERY($id: ID!) {
		item(where: { id: $id }) {
			id
			title
			description
			largeImage
		}
	}
`;

export default compose(
	graphql(SINGLE_ITEM_QUERY, {
        name: 'data',
		options: ({ id }) => ({
            variables: {
                id
            }
        })
    })
)(CreateItem);
