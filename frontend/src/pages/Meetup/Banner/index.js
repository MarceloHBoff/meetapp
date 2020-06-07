import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdAddAPhoto } from 'react-icons/md';

import api from '../../../services/api';

import { Container } from './styles';

export default function Banner() {
  const { defaultValue, registerField } = useField('File');
  const { error } = useField('banner_id');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'banner_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
    // eslint-disable-next-line
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    try {
      const response = await api.post('files', data);
      const { id, url } = response.data;

      setFile(id);
      setPreview(url);
    } catch (err) {
      console.tron.log('normalidade');
    }
  }

  return (
    <Container>
      <label htmlFor="File">
        {preview ? (
          <img src={preview} alt="Meetup" />
        ) : (
          <div>
            <MdAddAPhoto size={60} color="#fff" />
            <span>Selecionar uma imagem</span>
          </div>
        )}

        <input
          type="file"
          id="File"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>

      {error && <span>{error}</span>}
    </Container>
  );
}
