import React, { useState } from 'react';
import styles from './style.module.css';

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
    const files = event.target.files;
    if (!files) return;
    const arrFiles = Array.from(files);
    arrFiles.forEach((file) => {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileContents = JSON.parse(e.target?.result as string);
          setJsonData((prevState) => [...prevState, fileContents]);
        };
        reader?.readAsText(file);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const dataToFilter: Data[] = [];
    jsonData.map((item) => {
      //no idea how to fix typings here for now ¯\_(ツ)_/¯
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dataToFilter.push(...item);
    });

    const filteredData: Data[] = dataToFilter.filter((item: Data) => {
      return (
        item.shop?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
    });
    setGames(filteredData);
  };

  return (
    <div>
      <header className={styles.header}>
        <input
          type="file"
          multiple
          accept=".json"
          onChange={handleImport}
          className={styles.importButton}
        />
        <br />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setTerm(e.target.value)}
          className={styles.searchInput}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </header>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Title</th>
            <th>Availability</th>
            <th>Price</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {games.map((item) => {
            return (
              <tr className={styles.gameRow} key={item.url}>
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
