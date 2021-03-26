import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function ResponsiveTable(props) {
    console.log(props, 'are table  props')
    return(
        <Table>
				<Thead>
					<Tr>
						<Th className='th'>Total Income</Th>
						<Th className='th'>Total Expenses</Th>
						<Th className='th'>Total Debt</Th>
						<Th className='th'>Total Savings</Th>
						<Th className='th'>Leftover $</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td className='td'>Enter a value</Td>
						<Td className='td'>Enter a value</Td>
						<Td className='td'>Enter a value</Td>
						<Td className='td'>Enter a value</Td>
						<Td className='td'>Enter a value</Td>
					</Tr>
				</Tbody>
			</Table>
    )
}