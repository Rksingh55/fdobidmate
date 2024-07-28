// import React from 'react';
// import Cards from 'react-credit-cards';
// import 'react-credit-cards/es/styles-compiled.css'; 

// export default class PaymentForm extends React.Component {
//     state = {
//         cvc: '',
//         expiry: '',
//         focus: '',
//         name: '',
//         number: '',
//         formData: {},
//         errors: {
//             number: '',
//             cvc: '',
//             name: '',
//             expiry: '',
//         },
//     };

//     handleInputFocus = (e) => {
//         this.setState({ focus: e.target.name });
//     }
//     handleInputChange = (e) => {
//         const { name, value } = e.target;

//         if (name === 'number' && value.length > 16) {
//         }
//         if (name === 'cvc' && value.length > 4) {
//         }
//         if (name === 'name' && value.length > 20) {
//         }
//         if (name === 'expiry' && value.length > 5) {
//         }

//         this.setState({ [name]: value }, () => this.validateField(name, value));
//     }

//     validateField = (name, value) => {
//         let errors = { ...this.state.errors };
//         switch (name) {
//             case 'number':
//                 if (value.length !== 16) {
//                     errors.number = 'Card number must be exactly 16 digits';
//                 } else {
//                     errors.number = '';
//                 }
//                 break;
//             case 'cvc':
//                 if (value.length !== 4) {
//                     errors.cvc = 'CVC must be exactly 4 digits';
//                 } else {
//                     errors.cvc = '';
//                 }
//                 break;
//             case 'name':
//                 if (value.length > 50) {
//                     errors.name = 'Name cannot be more than 50 characters';
//                 } else {
//                     errors.name = '';
//                 }
//                 break;
//             case 'expiry':
//                 if (value.length !== 5 || !/^([0-1][0-9])\/([0-9][0-9])$/.test(value)) {
//                     errors.expiry = 'Expiry date must be in MM/YY format with 2-digit year';
//                 } else {
//                     errors.expiry = '';
//                 }
//                 break;
//             default:
//                 break;
//         }

//         this.setState({ errors });
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();
//         const { number, cvc, name, expiry } = this.state;
//         if (number.length === 16 && cvc.length === 4 && name.length <= 20 && /^([0-1][0-9])\/([0-9][0-9])$/.test(expiry)) {
//             const formData = { number, cvc, name, expiry };
//             this.setState({ formData }, () => {
//                 console.log('Form Data:', this.state.formData);
//             });
//         } else {
//             console.log('Validation errors:', this.state.errors);
//         }
//     }

//     render() {
//         return (
//             <div className="flex gap-2  p-2 bg-[#C1E9FF]  rounded-md">
//                 <div className="mb-4">
//                     <Cards
//                         cvc={this.state.cvc}
//                         expiry={this.state.expiry}
//                         focused={this.state.focus}
//                         name={this.state.name}
//                         number={this.state.number}
//                         className="bg-gray-100 rounded-md p-4"
//                     />
//                 </div>
//                 <form className="space-y-4" onSubmit={this.handleSubmit}>
//                     <div>
//                         <label htmlFor="number" className="block text-sm font-medium text-gray-700">Card Number</label>
//                         <input
//                             type="number"
//                             id="number"
//                             name="number"
//                             placeholder="Enter Card Number"
//                             onChange={this.handleInputChange}
//                             onFocus={this.handleInputFocus}
//                             value={this.state.number}
//                             className={`mt-1 block w-full px-3 py-2 border ${this.state.errors.number ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//                         />
//                         {this.state.errors.number && <p className="text-red-500 text-sm mt-1">{this.state.errors.number}</p>}
//                     </div>
//                     <div>
//                         <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name on Card</label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             placeholder="Card Holder Name"
//                             onChange={this.handleInputChange}
//                             onFocus={this.handleInputFocus}
//                             value={this.state.name}
//                             className={`mt-1 block w-full px-3 py-2 border ${this.state.errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//                         />
//                         {this.state.errors.name && <p className="text-red-500 text-sm mt-1">{this.state.errors.name}</p>}
//                     </div>
//                     <div className="flex space-x-4">
//                         <div className="w-1/2">
//                             <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry (MM/YY)</label>
//                             <input
//                                 type="number"
//                                 id="expiry"
//                                 name="expiry"
//                                 placeholder="MM/YY"
//                                 onChange={this.handleInputChange}
//                                 onFocus={this.handleInputFocus}
//                                 value={this.state.expiry}
//                                 className={`mt-1 block w-full px-3 py-2 border ${this.state.errors.expiry ? 'border-red-500' : 'border-gray-300'} rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//                             />
//                             {this.state.errors.expiry && <p className="text-red-500 text-sm mt-1">{this.state.errors.expiry}</p>}
//                         </div>
//                         <div className="w-1/2">
//                             <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
//                             <input
//                                 type="number"
//                                 id="cvc"
//                                 name="cvc"
//                                 placeholder="CVV"
//                                 onChange={this.handleInputChange}
//                                 onFocus={this.handleInputFocus}
//                                 value={this.state.cvc}
//                                 className={`mt-1 block w-full px-3 py-2 border ${this.state.errors.cvc ? 'border-red-500' : 'border-gray-300'} rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//                             />
//                             {this.state.errors.cvc && <p className="text-red-500 text-sm mt-1">{this.state.errors.cvc}</p>}
//                         </div>
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full px-4 py-2 bg-[#FC8404] text-white font-semibold rounded-md  hover:bg-[#e1a05a]"
//                     >
//                         Pay
//                     </button>
//                 </form>
//             </div>
//         );
//     }
// }
