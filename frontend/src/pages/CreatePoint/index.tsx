import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

interface Item {
  id: number,
  title: string,
  image_url: string,
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    api.get('/items').then(response => {
      setItems(response.data);
    });
  }, []);

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form>
        <h1>Cadastro do <br /> ponto de coleta</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

            <div className="field">
              <label htmlFor="name">Nome da entidade</label>
              <input type="text" id="name" name="name" />
            </div>

            <div className="field-group">            
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input type="text" id="email" name="email" />
              </div>

              <div className="field">
                <label htmlFor="whatsapp">WhatsApp</label>
                <input type="text" id="whatsapp" name="whatsapp" />
              </div>
            </div>
          </fieldset>


          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione um endereço no mapa</span>
            </legend>

            <Map center={[-8.7982609, -63.8995109]} zoom={15}>
              <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[-8.7982609, -63.8995109]} />
            </Map>

            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Estado (UF)</label>
                <select id="uf" name="uf">
                  <option value="0">Selecione uma UF</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="city">Cidade</label>
                <select id="city" name="city">
                  <option value="0">Selecione uma Cidade</option>
                </select>
              </div>
            </div>
          </fieldset>


          <fieldset>
            <legend>
              <h2>Ítens de coleta</h2>
              <span>Selecione um ou mais ítens abaixo</span>
            </legend>

            <ul className="items-grid">
              { items.map(item => (
                <li key={item.id}>
                  <img src={item.image_url} alt={item.title} />
                  <span>{item.title}</span>
                </li>  
              )) }
            </ul>
          </fieldset>

          <button type="submit">Cadastrar ponto de coleta</button>
        </form>
      </div>
    );
};

export default CreatePoint;
