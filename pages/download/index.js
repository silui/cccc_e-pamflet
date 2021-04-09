import React from 'react';
import axios from 'axios';

import { Document, Page , pdfjs} from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


class Download extends React.Component {
    state = {
      pdfData: null
    }
    componentDidMount() {
      axios.get('/api/fileUpload').then(res => {
          if (res.data.pdfData != null) {
            this.setState({pdfData: res.data.pdfData.data})
          }
        }
      )
    }
    render() {
      if (this.state.pdfData) {
        return (
          <div>
              <Document file={{data: this.state.pdfData}}>
                  <Page pageNumber={1} />
              </Document>
          </div>
        );
      }
      else{
        return (<div>Loading</div>);
      }
    }
 }

export default Download;