import React from 'react';
import itemImage from '../../Images/truck.jpg';
import './Cart.css';
// import { Link } from 'react-router-dom';

class Cart extends React.Component {
    render() {
        return (
            <div className='Cart'>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="page-header">
                                <h1>Your Shopping Cart</h1>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <form>
                                        </form>
                                        <div class="row cart-row">
                                            <div class="col-xs-12 col-sm-2">
                                                <div class="pull-left">
                                                    <a href="/cart/change?line={{ forloop.index }}&amp;quantity=0">
                                                        <span
                                                            class="glyphicon glyphicon-remove-sign"
                                                            aria-hidden="true"
                                                        ></span>
                                                    </a>
                                                    <a href="{{ item.url | within: collections.all }}">
                                                        <img
                                                            src={itemImage}
                                                            class="img-responsive"
                                                            alt="Image Item"
                                                        />
                                                     </a> 
                                                  </div>
                                                </div>
                                              </div>
                                         </div>
                                </div>
                                <div class="col-xs-12 col-sm-4">
                                    <h3><a href="Toy Truck">Toy Truck</a></h3>
 
                                </div>
                                {/* Amount */}
                                <div class="col-xs-5 col-sm-2">
                                    <h3 class="h3-price">
                                        $25.00
                                    </h3>
                                    <small>each</small>
                                </div>
                                {/* Quantitiy*/}
                                <div class="col-xs-7 col-sm-2">
                                    <div class="form-group">
                                        <input
                                            type="number"
                                            name="updates[]"
                                            id="updates_{{ item.id }}"
                                            value="1"
                                            min="0"
                                            class="cart-qty-input"
                                        >
                                        </input>
                                            <small>quantity</small>                                     
  </div>
                                    </div>
                                </div>
                            {/* Total Amount*/}
                            <div class="col-xs-12 col-sm-2">
                                <h3 class="h3-price">
                                    $28.00
                                </h3>
                                <small>item total</small>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    };
}

export default Cart;
