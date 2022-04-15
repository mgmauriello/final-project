// import React from 'react';
// import Map from './components/map';
// import ParseRoute from './lib/parse-route';
// import SoundscapeForm from './pages/soundscapeForm';
// import MapPage from './pages/mapPage';

// export default class App extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     route: ParseRoute(window.location.hash)
//   //   };
//   // }

//   // componentDidMount() {
//   //   window.addEventListener('hashchange', () => {
//   //     this.setState({
//   //       route: ParseRoute(window.location.hash)
//   //     });
//   //   }, false);
//   // }

//   // renderPage() {
//   //   const { route } = this.state;
//   //   if (route.path === '') {
//   //     return <MapPage />;
//   //   }
//   //   if (route.path === 'form') {
//   //     return <SoundscapeForm />;
//   //   }
//   // }

//   render() {
//     return (
//       <>
//         <Map />
//         {this.renderPage()}
//       </>
//     );
//   }

// }
