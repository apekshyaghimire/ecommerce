import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'

const Users = () => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/all-users')
      if (data?.success) setUsers(data.users)
    } catch (error) {
      console.error('Error fetching users', error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Layout title= {'Dashboard-All Users'}>
        <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-3"> <AdminMenu/> </div>
            <div className="col-md-9">
                <h1>All users</h1>

                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users && users.length > 0 ? (
                        users.map((u, i) => (
                          <tr key={u._id}>
                            <td>{i+1}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                            <td>{u.address}</td>
                            <td>{u.role === 1 ? 'Admin' : 'User'}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center">No users found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users