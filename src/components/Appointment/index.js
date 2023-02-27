import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";

import { getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";

export default function Appointment(props) {
	const { interview, time, interviewers, bookInterview, id } = props;
	const { mode, back, transition } = useVisualMode(interview ? SHOW : EMPTY);

	const save = function (name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		bookInterview(id, interview).then(() => {
			transition(SHOW);
		});
	};

	return (
		<article className='appointment'>
			<Header time={time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={interview.student}
					interviewer={interview.interviewer}
				/>
			)}
			{mode === CREATE && (
				<Form
					onSave={save}
					interviewers={interviewers}
					student=''
					onCancel={back}
				/>
			)}
			{/* {mode === SAVE && <Status message='Saving' />} */}
		</article>
	);
}
