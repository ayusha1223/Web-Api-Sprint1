export default function AdminUsersPage() {
  return (
    <div>
      <h1>Users Table (Dummy)</h1>

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>123</td>
            <td>test@email.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
