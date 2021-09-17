import React from 'react';

export default function Home() {
  return (
    <div>
      home
      <button
        type="button"
        onClick={() => {
          window.sessionStorage.removeItem('userDetails');
        }}
      >
        logout
      </button>
    </div>
  );
}
