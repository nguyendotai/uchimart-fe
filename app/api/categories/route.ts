import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'Data', 'categories.json'); // Đường dẫn tới thư mục Data ở cấp gốc
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading categories.json:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}