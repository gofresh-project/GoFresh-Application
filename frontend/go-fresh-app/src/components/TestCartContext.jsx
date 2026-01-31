// // src/components/TestCartContext.jsx
// import React from 'react';
// import { useCart } from '../context/CartContext';

// const TestCartContext = () => {
//   try {
//     const cartContext = useCart();
    
//     console.log('✅ CartContext Test Results:');
//     console.log('Available functions:', Object.keys(cartContext));
//     console.log('getCartItemCount exists?', typeof cartContext.getCartItemCount);
//     console.log('getCartItemCount is function?', typeof cartContext.getCartItemCount === 'function');
//     console.log('Cart:', cartContext.cart);
//     console.log('Current User:', cartContext.currentUser);
    
//     return (
//       <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
//         <h3>CartContext Test</h3>
//         <pre>
//           {JSON.stringify({
//             functions: Object.keys(cartContext),
//             hasGetCartItemCount: typeof cartContext.getCartItemCount === 'function',
//             cartLength: cartContext.cart?.length || 0,
//             currentUser: cartContext.currentUser
//           }, null, 2)}
//         </pre>
//       </div>
//     );
//   } catch (error) {
//     console.error('❌ CartContext Error:', error);
//     return (
//       <div style={{ padding: '20px', backgroundColor: '#ffcccc' }}>
//         <h3>❌ CartContext Error</h3>
//         <p>{error.message}</p>
//       </div>
//     );
//   }
// };

// export default TestCartContext;