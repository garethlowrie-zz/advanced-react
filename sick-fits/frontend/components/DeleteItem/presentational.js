import styled from 'styled-components';

const Button = styled.button`
	cursor: pointer;

	:hover {
		background-color: red;
		color: white;
	}
`;

const DeleteItem = ({
	children,
	deleteItemError,
	deleteItemLoading,
	onClick
}) => {
	return (
		<Button onClick={onClick}>{children}</Button>
	);
}

export default DeleteItem;
