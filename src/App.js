import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./sections/dashboard";
import Order from "./orders/orders";
import AddOrderPage from "./sections/addOrderPage";
import OrderForm from "./sections/order-form";
import PDFUploadPreview from "./sections/customs";
import { EditOrder } from "./sections/edit-orders";
import AddPODPage from "./sections/add-pod";
import {AiTool} from "./sections/ai-tool"
import { Authorization } from "./ai-tool/authorization";
import { LoadQuote } from "./ai-tool/loadquote";
import { UserProfile } from "./profile/userprofile";
import Customs from "./sections/customs";
import Broker from "./customs/broker";
import {NewCustoms} from "./sections/new-customs";
import { AddBroker } from "./sections/add-broker";
import { AddOrder } from "./sections/add-order";
import Invoice from "./orders/invoice"
import Transport from "./transport/transport";
import { AddTruck } from "./transport/add-truck";
import { AddTrailer } from "./transport/add-trailer";
import { EditTruck } from "./transport/edit-truck";
import Driver from "./transport/driver";
import { AddDriver } from "./transport/add-driver";
import Expense from "./transport/expense";
import { AddExpense } from "./transport/add-expense";
import { PDFeditor } from "./pdfeditor/pdf-editor";
import Canvas from "./pdfeditor/canvas";
import { AddCustoms } from "./customs/add-customs";
import { SendEmail } from "./customs/send-email";
import { EditCustoms } from "./customs/edit-customs";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/orders" element={<Order/>} />
      <Route path="/ai-tool" element={<AiTool/>}/>
      <Route path="/customs" element={<PDFUploadPreview/>} />
      <Route path="/add-order" element={<AddOrderPage/>}/>
      <Route path="/order-form"element={<OrderForm/>}></Route>
      <Route path="/addorders" element={<AddOrder/>}></Route>
      <Route path="/editorders" element={<EditOrder/>}></Route>
      <Route path="/add-pod" element={<AddPODPage/>}></Route>
      <Route path="/ai-tool/authorization" element={<Authorization/>}></Route>
      <Route path="/ai-tool/loadquote" element={<LoadQuote/>}></Route>
      <Route path="/profile/userprofile" element={<UserProfile/>}></Route>
      <Route path="/customs/overview" element={<Customs/>}></Route>
      <Route path="/customs/broker" element={<Broker/>}></Route>
      <Route path="/customs/add-broker" element={<AddBroker/>}></Route>
      <Route path="/customs/new-customs" element={<NewCustoms/>}></Route>
      <Route path="/customs/add-customs" element={<AddCustoms/>}></Route>
      <Route path="/customs/send-emails" element={<SendEmail/>}></Route>
      <Route path="/customs/edit-customs" element={<EditCustoms/>}></Route>
      <Route path="/orders/invoice" element={<Invoice/>}></Route>
      <Route path="/transport/overview" element={<Transport/>}></Route>
      <Route path="/transport/add-truck" element={<AddTruck/>}></Route>
      <Route path="/transport/add-trailer" element={<AddTrailer/>}></Route>
      <Route path="/transport/edit-truck" element={<EditTruck/>}></Route>
      <Route path="/transport/driver" element={<Driver/>}></Route>
      <Route path="/transport/add-driver" element={<AddDriver/>}></Route>
      <Route path="/transport/expense" element={<Expense/>}></Route>
      <Route path="/transport/add-expense" element={<AddExpense/>}></Route>
      <Route path="/pdfeditor" element={<PDFeditor/>}></Route>
      
    </Routes>
  );
};

export default App;
