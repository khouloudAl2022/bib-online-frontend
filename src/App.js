import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const adminRouting = adminRoutes.map((route) => {
  return (
    route.element && {
      path: route.path,
      element: <route.element />,
      exact: route.exact,
      name: route.name
    }
  )
})
const clientRouting = clientRoutes.map((route) => {
  return (
    route.element && {
      path: route.path,
      element: <route.element />,
      exact: route.exact,
      name: route.name
    }
  )
})
const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: clientRouting
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/admin',
    element: <PrivateRoute><Layout /></PrivateRoute>,
    children: adminRouting
  },
  {
    path: '*',
    element: <Page404 />
  },

]);
function App() {
  return <div className="App">
 <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Suspense fallback={Loading}>
        <RouterProvider router={router} fallbackElement={Loading} />

      </Suspense>
  </div>;
}

export default App;
