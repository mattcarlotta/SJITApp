import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { Tooltip } from "antd";
import { FaFileAlt } from "react-icons/fa";
import { Droppable, Draggable } from "react-beautiful-dnd";
import {
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
											response={response}
										>
											<div>
												{firstName} {lastName}
												{notes && (
													<Tooltip trigger="hover" title={notes}>
														<FaFileAlt
															style={{
																marginLeft: 5,
																fontSize: 14,
																position: "relative",
																top: 2,
															}}
														/>
													</Tooltip>
												)}
											</div>
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
