export function getIssueById(issues, id) {
	if(issues===null) return null;
	let selectedIssue = null;
	issues.forEach(issue=>{
	  if(issue.id == id){
	    selectedIssue = issue;
	  }
	});
	return selectedIssue;
}
