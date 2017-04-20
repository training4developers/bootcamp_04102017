import React from 'react';
import PropTypes from 'prop-types';

export const ViewRow = props => <tr>
	<td>{props.book.title}</td>
	<td className='capitalize'>{props.book.category}</td>
	<td className='number'>{props.book.price}</td>
	<td className='number'>{props.book.authorId}</td>
	<td>
		<button className='btn btn-primary btn-sm' type='button'
			onClick={() => props.onEdit(props.book.id)}>Edit</button>
		<button className='btn btn-danger btn-sm' type='button'
			onClick={() => props.onDelete(props.book)}>Delete</button>
	</td>
</tr>;

ViewRow.propTypes = {

    book: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        category: PropTypes.string,
        price: PropTypes.number,
        authorId: PropTypes.number
    }),
    onEdit: PropTypes.func,
    onDelete: PropTypes.func

};
