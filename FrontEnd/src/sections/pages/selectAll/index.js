import React from 'react';
import { Breadcrumb, Breadcrumbs } from 'react-rainbow-components';
import { navigateTo } from '../../../history';
import PageHeader from '../../../components/PageHeader';
import './styles.css';

const SelectAllFromTable = ({ match }) => {
  const {
    params: { tableName }
  } = match;

  return (
    <>
      <div className="react-rainbow-admin-orders_header-container">
        <Breadcrumbs>
          <Breadcrumb label="Pages" onClick={() => navigateTo('/pages')} />
          <Breadcrumb label="Vista tabella" />
        </Breadcrumbs>
        <PageHeader
          className="react-rainbow-admin-orders_header"
          title={tableName}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
      </div>
    </>
  );
};

export default SelectAllFromTable;

// class SelectAllFromTable extends Component {
//   componentDidMount() {
//     const { fetchOrdersData } = this.props;
//     fetchOrdersData();
//   }

//   render() {
//     return (
//       <div>
//         <div className="react-rainbow-admin-orders_header-container">
//           <Breadcrumbs>
//             <Breadcrumb label="Pages" onClick={() => navigateTo('/pages')} />
//             <Breadcrumb label="Vista tabella" />
//           </Breadcrumbs>
//           <PageHeader
//             className="react-rainbow-admin-orders_header"
//             title="Orders"
//             description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//           />
//         </div>
//       </div>
//     );
//   }
// }

// SelectAllFromTable.propTypes = {
//   fetchOrdersData: PropTypes.func.isRequired
// };

// function stateToProps(state) {
//   //call api query
//   //wait for response
//   //return result
//   return state.orders;
// }

// function dispatchToProps(dispatch) {
//   return bindActionCreators(
//     {
//       fetchOrdersData
//     },
//     dispatch
//   );
// }

// export default connect(
//   stateToProps,
//   dispatchToProps
// )(SelectAllFromTable);
