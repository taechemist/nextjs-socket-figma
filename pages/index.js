import { useState } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import useSocket from '../hooks/useSocket';
import FlipMove from 'react-flip-move';

export default function ChatOne() {
	const [events, setEvents] = useState([]);

	const getUniqueKey = () => {
		const key = Date.now();
		// console.log(key);
		return key;
	}

	useSocket('events', (e) => {
		e['uid'] = getUniqueKey();
		setEvents(events => [e, ...events])
		// console.log(e)
	});

	return (
		<>
			<FlipMove enterAnimation="fade" leaveAnimation="fade" verticalAlignment="top">
				{events && events.map((event) =>
					<div key={event.uid}>
						{event.event_type && event.event_type} | 
						{event.file_name && event.file_name} |
						{event.file_name && event.file_name} |
						{event.triggered_by && event.triggered_by.handle}
					</div>
				)}
			</FlipMove>
		</>
	);
}

// ChatOne.getInitialProps = async () => {

// };
