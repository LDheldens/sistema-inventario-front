import { Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';

import React from 'react'

const ProductosPDF = ({productos}) => {
    const styles = StyleSheet.create({
        page: {
          flexDirection: 'row',
          backgroundColor: 'white',
          padding: 10
        },
        titulo:{
            margin:'0 auto',
            marginVertical:20
        },  
        table: {
          display: 'table',
          width: 'auto',
          borderStyle: 'solid',
          borderWidth: 1,
          borderRightWidth: 0,
          borderBottomWidth: 0,
          justifyContent:'center'
        },
        tableRow: {
          margin: 'auto',
          flexDirection: 'row',
        },
        tableCol: {
          width: '25%',
          borderStyle: 'solid',
          borderWidth: 1,
          borderLeftWidth: 0,
          borderTopWidth: 0,
        },
        tableCell: {
          margin: 'auto',
          marginTop: 5,
          fontSize: 12,
        },
        image: {
            width: '100px',
            height: '50px',
        },
    });
    
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                <Text style={styles.titulo}>Tabla de Productos</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>NOMBRE</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>STOCK</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>PRECIO</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>CATEGORIA</Text>
                    </View>
                    </View>
                        {productos?.map((producto) => (
                        <View style={styles.tableRow} key={producto?.id}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{producto?.nombre}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{producto?.stock}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{producto?.precio}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{producto?.categoria?.nombre}</Text>
                            </View>
                        </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
}

export default ProductosPDF
