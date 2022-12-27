import React, { useState } from 'react';

interface Data {
  date: string;
  shop: string;
  title: string;
  price: string;
  shipment: string;
  availability: string;
  url: string;
}

const SearchableList = () => {
  const [searchTerm, setTerm] = useState<string>('');
  const [jsonData, setJsonData] = useState<Data[]>([]);
  const [games, setGames] = useState<Data[]>([]);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setJsonData(JSON.parse(e.target?.result as string));
      };
      reader.readAsText(file);
    }
  };

  const handleSearch = () => {
    const filteredData: Data[] = jsonData.filter((item: Data) => {
      return (
        item.shop?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
    });
    setGames(filteredData);
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleImport} />
      <br />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Availability</th>
            <th>Price</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {games.map((item) => {
            return (
              <tr key={item.url}>
                <td>{item.title}</td>
                <td>{item.availability}</td>
                <td>{item.price}</td>
                <td>
                  <a href={item.url}>{item.url}</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SearchableList;
