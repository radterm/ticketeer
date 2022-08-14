import React from 'react';

import Cookies from 'js-cookie';

export function csrfMiddleware(data, headers) {
	headers['X-CSRFToken'] = Cookies.get('csrftoken');
	return data;
}

export function isCsrfCookiePresent() {
	const cookie = Cookies.get('csrftoken');
	return (cookie!==undefined);
}

export default function TicketeerForm(props){
	return (
		<div>
			<div className="row">
				<div className="col-md-2" />
				<div className="col-md-8">	
					<div className="card my-4 mx-sm-4 mx-1">
					  <div className="card-body">
					    <form onSubmit={props.onSubmit}>
					    	{props.children}
					    </form>
					  </div>
					</div>
					{props.excessWidget}
				</div>
				<div className="col-md-2" />
			</div>
		</div>
	);
};
