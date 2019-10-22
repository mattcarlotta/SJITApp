import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { Droppable, Draggable } from "react-beautiful-dnd";
import {
	Badge,
	Column,
	ColumnTitle,
	Footer,
	NoUsers,
	User,
	UserContainer,
} from "components/Body";

const DropContainer = ({ id, title, users, width }) => (
	<Column width={width}>
		<ColumnTitle style={{ marginBottom: 5 }}>{title}</ColumnTitle>
		<Droppable droppableId={id}>
			{({ innerRef, placeholder }, { isDraggingOver }) => (
				<UserContainer ref={innerRef} isDraggingOver={isDraggingOver}>
					{!isEmpty(users) ? (
						users.map(
							({ _id, firstName, lastName, response, notes }, index) => (
								<Draggable key={_id} draggableId={_id} index={index}>
									{(
										{
											draggableProps,
											dragHandleProps: eventHandlers,
											innerRef,
										},
										{ isDragging },
									) => (
										<User
											ref={innerRef}
											{...draggableProps}
											{...eventHandlers}
											isDragging={isDragging}
										>
											<Badge response={response} style={{ margin: 0 }}>
												{firstName} {lastName}
											</Badge>
											{notes && (
												<p css="margin: 0; padding-left: 25px;font-style: italic;">
													({notes})
												</p>
											)}
										</User>
									)}
								</Draggable>
							),
						)
					) : (
						<NoUsers />
					)}
					{placeholder}
					<Footer />
				</UserContainer>
			)}
		</Droppable>
	</Column>
);

DropContainer.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	users: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			firstName: PropTypes.string,
			lastName: PropTypes.string,
			response: PropTypes.string,
			notes: PropTypes.string,
		}),
	),
	width: PropTypes.string,
};

export default DropContainer;
