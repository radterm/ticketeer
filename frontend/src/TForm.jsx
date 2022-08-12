import React from 'react';

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
				</div>
				<div className="col-md-2" />
			</div>
		</div>
	);
};
