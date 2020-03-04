import React from 'react';
import ReactPaginate from 'react-paginate';

const Results = ({ list, pageCount, loadEvents, PAGELIMIT, query}) => {

  var events = list.map((event,i)=>{
    return (
      <tr key={i}>
        <td>{event.date}</td>
        <td>{event.description}</td>
        <td>{event.language}</td>
        <td>{event.category1}</td>
        <td>{event.category2}</td>
        <td>{event.granularity}</td>
      </tr>
    )
  });

  function handlePageClick(event) {
    // console.log('event selected', event.selected);
    let selected = event.selected + 1;
    loadEvents(query, selected);
  }

  if(!list.length || !pageCount) {
    return <div>Enter a search to show the list</div>
  }

  let paginateElement = (<ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
  );

  // console.log('pagecount last ',pageCount);
  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>date</th>
          <th>description</th>
          <th>language</th>
          <th>category1</th>
          <th>category2</th>
          <th>granularity</th>
        </tr>
      </thead>
      <tbody>
        {events}
      </tbody>
    </table>
    {paginateElement}
  </div>
  )
}

export default Results;