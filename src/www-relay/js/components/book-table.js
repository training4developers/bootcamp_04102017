import React from 'react';
import PropTypes from 'prop-types';
import { ViewRow } from './view-row';
import { EditRow } from './edit-row';

export const BookTable = props => <table className="table table-inverse">
	<thead>
		<tr>
			<th>Title</th>
			<th>Category</th>
			<th>Price</th>
			<th>Author Id</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		{props.books.edges.map(edge => props.editBookId === edge.node.id
			? <EditRow key={edge.node.id} book={edge.node}
				onSave={props.onSave} onCancelEdit={props.onCancelEdit} />
		: <ViewRow key={edge.node.id} book={edge.node}
			onEdit={props.onEdit} onDelete={props.onDelete} />)}
		<EditRow onSave={props.onSave} key="-1" />
	</tbody>
</table>;

BookTable.propTypes = {
    books: PropTypes.shape({
        edges: PropTypes.array
    }),
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
    onCancelEdit: PropTypes.func,
    onEdit: PropTypes.func
};