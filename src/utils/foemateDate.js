export function formatDate(dateString) {
    const date = new Date(dateString);
  
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    return formattedDate;
  }
  