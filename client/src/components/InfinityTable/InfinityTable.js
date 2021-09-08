import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TablePagination } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  tableWrapper: {
    marginTop: '20px',
    flexDirection: 'column',
    maxWidth: '100%',
    display: 'block',
    overflowX: 'scroll'
  },
  navigation: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
}))

const PER_PAGE = 20

const InfinityTable = props => {
  const classes = useStyles()
  const { page, totalCount, handleChangePage, renderHeader, renderBody } = props

  return (
    <>
      <div className={classes.tableWrapper}>
        {renderHeader()}
        {renderBody()}
      </div>
      <div className={classes.navigation}>
        <TablePagination
          classes={{ caption: classes.pagination }}
          rowsPerPageOptions={[]}
          component="div"
          count={totalCount}
          rowsPerPage={PER_PAGE}
          page={page}
          onPageChange={handleChangePage}
        />
      </div>
    </>
  )
}

export default InfinityTable

// import Search from '../../components/Search'

// const [page, setPage] = useState(0);
// const [search, setSearch] = useState('');
// const ref = useRef(null)

  // const renderHeader = () => {
  //   return (
  //     <div className={classes.tableHeader}>
  //       {columns.map(column => <div className={classes.headerItem} key={column.title}>{column.title}</div>)}
  //     </div>
  //   )
  // }


  // const renderBody = () => {
  //   return (
  //     <div className={classes.bodyWrapper}>
  //       {offers.slice(PER_PAGE * page, (page + 1) * PER_PAGE).map((row) => {
  //         return (
  //           <div className={classes.tableRow} key={row._id} >
  //             <div className={classes.rowItem}>{row.offerId}</div>
  //             <div className={classes.rowItem}>{row.isImported}</div>
  //             <div className={classes.rowItem}>{row.pdz}</div>
  //             <div className={classes.rowItem}>{row.type}</div>
  //             <div className={classes.rowItem}>{row.isForeigners}</div>
  //             <div className={classes.rowItem}>{row.isSpecialIntroduction}</div>
  //             <div className={classes.rowItem}>{row.name}</div>
  //             <div className={classes.rowItem}>{row.educationalDegree}</div>
  //             <div className={classes.rowItem}>{row.admissionBased}</div>
  //             <div className={classes.rowItem}>{row.studyForm}</div>
  //             <div className={classes.rowItem}>{row.course}</div>
  //             <div className={classes.rowItem}>{row.specialtyCode}</div>
  //             <div className={classes.rowItem}>{row.specialty}</div>
  //             <div className={classes.rowItem}>{row.specialization}</div>
  //             <div className={classes.rowItem}>{row.masterType}</div>
  //             <div className={classes.rowItem}>{row.educationalPrograms}</div>
  //             <div className={classes.rowItem}>{row.structuralUnit}</div>
  //             <div className={classes.rowItem}>{row.isShortenedTerm}</div>
  //             <div className={classes.rowItem}>{row.studyPeriod}</div>
  //             <div className={classes.rowItem}>{row.studyStart}</div>
  //             <div className={classes.rowItem}>{row.studyEnd}</div>
  //             <div className={classes.rowItem}>{row.dateApplication}</div>
  //             <div className={classes.rowItem}>{row.lastChange}</div>
  //             <div className={classes.rowItem}>{row.licenseDownload}</div>
  //             <div className={classes.rowItem}>{row.licenseBasis}</div>
  //             <div className={classes.rowItem}>{row.minKBR}</div>
  //             <div className={classes.rowItem}>{row.regionalOrder}</div>
  //           </div>
  //         )
  //       })}
  //     </div>
  //   )
  // }

//   <InfinityTable
//   data={offers}
//   columns={columns}
//   totalCount={offers.length}
//   page={page}
//   renderHeader={renderHeader}
//   renderBody={renderBody}
//   handleChangePage={(e, nextPage) => setPage(nextPage)}
// />
