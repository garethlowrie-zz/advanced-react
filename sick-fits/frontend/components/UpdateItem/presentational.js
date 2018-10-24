import Form from 'components/styles/Form';
import ErrorMessage from 'components/ErrorMessage/presentational';

const UpdateItem = ({
	data,
	title,
	description,
	image,
	price,
	updateItemLoading,
	updateItemError,
	onChange,
	onFormSubmit,
	onImageUpload
}) => {
	const { image: defaultImage, title: defaultTitle, description: defaultDescription, price: defaultPrice } = data.item;
	return (
		<>
			{data.loading && <p>Loading...</p>}
			{data.error && <p>Error</p>}
			{!data.item && <p>Item not found</p>}
			{data.item && (
				<Form onSubmit={onFormSubmit}>
					<ErrorMessage error={updateItemError} />
					<fieldset disabled={updateItemLoading} aria-busy={updateItemLoading}>
						<label htmlFor="file">
							Image
							<input type="file" id="file" name="file" placeholder="Upload an image" onChange={onImageUpload} />
							<img src={image ? image : defaultImage} width="200" />
						</label>
						<label htmlFor="title">
							Title
							<input type="text" id="title" name="title" placeholder="Title" defaultValue={defaultTitle} onChange={onChange} required />
						</label>
						<label htmlFor="price">
							Price
							<input type="number" id="price" name="price" placeholder="Price" defaultValue={defaultPrice} onChange={onChange} required />
						</label>
						<label htmlFor="description">
							Description
							<textarea id="description" name="description" placeholder="Enter a Description" defaultValue={defaultDescription} onChange={onChange} required />
						</label>
						<button type="submit">Submit</button>
					</fieldset>
				</Form>
			)}
		</>
	);
}

export default UpdateItem;
