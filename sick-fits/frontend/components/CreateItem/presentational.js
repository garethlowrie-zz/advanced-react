import Form from 'components/styles/Form';
import ErrorMessage from 'components/ErrorMessage/presentational';

const CreateItem = ({
	title,
	description,
	image,
	price,
	createItemLoading,
	createItemError,
	onChange,
	onFormSubmit,
	onImageUpload
}) => {
	return (
		<Form onSubmit={onFormSubmit}>
			<ErrorMessage error={createItemError} />
			<fieldset disabled={createItemLoading} aria-busy={createItemLoading}>
				<label htmlFor="file">
					Image
					<input type="file" id="file" name="file" placeholder="Upload an image" onChange={onImageUpload} required />
					{image && <img src={image} width="200" />}
				</label>
				<label htmlFor="title">
					Title
					<input type="text" id="title" name="title" placeholder="Title" value={title} onChange={onChange} required />
				</label>
				<label htmlFor="price">
					Price
					<input type="number" id="price" name="price" placeholder="Price" value={price} onChange={onChange} required />
				</label>
				<label htmlFor="description">
					Description
					<textarea id="description" name="description" placeholder="Enter a Description" value={description} onChange={onChange} required />
				</label>
				<button type="submit">Submit</button>
			</fieldset>
		</Form>
	);
}

export default CreateItem;
